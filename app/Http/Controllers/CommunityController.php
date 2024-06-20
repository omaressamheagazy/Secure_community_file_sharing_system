<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreCommunityRequest;
use App\Http\Requests\UpdateCommunityRequest;
use App\Http\Resources\CommunityResource;
use App\Http\Resources\CommunityListResource;
use App\Http\Resources\CommunityHierarchyResource;
use App\Models\User;
use App\Enums\Status;
use App\Http\Requests\UpdateCommunityJoinRequest;
use App\Http\Resources\CommunityRequestResource;
use App\Models\Community;
use App\Models\CommunityHierarchy;
use App\Models\CommunityMember;
use App\Models\CommunityRequest;
use Illuminate\Database\Eloquent\Casts\Json;

use Illuminate\Database\Eloquent\ModelNotFoundException;

class CommunityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::findOrFail(Auth::id());
        $communities = $user->joinedCommunities;
        lad($communities);
        return CommunityListResource::collection($communities);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCommunityRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = $request->user()->id;
        $community = Community::create($data);

        if (!$data['parent_id']) {
            $community->users()->attach($request->user()->id, ['membership_key' => $data['membership_key']]);
        }
        return new CommunityResource($community);
    }

    /**
     * Display the specified resource.
     */
    public function show(Community $community)
    {
        try {
            return new CommunityResource($community);
        } catch (\Exception $exception) {
            return response()->json([
                'message' => 'Something went wrong'
            ], 500);
        }
    }
    public function getCommunityKeys(Community $community)
    {
        return response()->json([
            'data' => [
                'public_key' => $community->public_key,
                'private_key' => $community->private_key
            ]
        ]);
    }
    public function getCommunityPrivateKey(Community $community)
    {
        return response()->json([
            'data' => $community->private_key
        ]);
    }
    public function showCommunityDetails($label)
    {
        return response()->json([
            'data' => CommunityHierarchy::getCommunityDetails($label)
        ]);
    }
    public function showAncestors($path)
    {
        return CommunityHierarchyResource::collection(CommunityHierarchy::getAncestors($path));
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCommunityRequest $request, Community $community)
    {
        $validatedData = $request->validated();
        $community->update($validatedData);
        return new CommunityResource($community);
    }
    public function showPublicCommunities()
    {
        // Retrieve the IDs of the communities the user has joined
        $userJoinedCommunityIds = Auth::user()->joinedCommunities->pluck('id')->toArray();
        $communities = Community::whereNull('parent_id')
                                ->whereNotIn('id', $userJoinedCommunityIds)
                                ->get();

        return CommunityListResource::collection($communities);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Community $community)
    {
        //
    }

    public function showMember($communityId)
    {
        $userId = Auth::id();
        $communityMember = CommunityMember::where('community_id', $communityId)
            ->where('user_id', $userId)
            ->first();
        return response()->json([
            'data' => $communityMember
        ]);
    }
    public function showRequests(Community $community)
    {
        $requests = CommunityRequest::with('user')
            ->where('community_id', $community->id)
            ->where('status', Status::PENDING)
            ->get();

        return CommunityRequestResource::collection($requests);
    }
    public function sendRequest(Community $community)
    {
        // Retrieve the authenticated user's ID from the session
        $userId = Auth::id();

        // Check if a request with the same community_id and user_id already exists
        $isRequestExist = CommunityRequest::isReuqestExists($community->id, $userId);
        // If a duplicate request exists, return an appropriate response
        if ($isRequestExist) {
            return response()->json(['message' => 'Request already exists'], 409); // HTTP 409 Conflict
        }
        // Create a new community request
        CommunityRequest::updateOrInsert(
            ['community_id' => $community->id, 'user_id' => $userId],
            ['status' => Status::PENDING]
        );
        // $communityRequest = new CommunityRequest();
        // $communityRequest->community_id = $community->id;
        // $communityRequest->user_id = $userId;
        // $communityRequest->status = Status::PENDING->value;
        // $communityRequest->save();
        // Return a response indicating the request was sent successfully
        return response()->json(['message' => 'Request sent successfully'], 201);
    }
    public function updateRequest(UpdateCommunityJoinRequest $request, Community $community, CommunityRequest $communityRequest) {
        $validatedData = $request->validated();
        if ($validatedData['status'] == Status::ACCEPT->value) {
            // add the new member to the community
            CommunityMember::create([
                'community_id' => $community->id,
                'user_id' => $validatedData['user_id'],
                'membership_key' => $validatedData['membership_key'],
            ]);
        }
        $communityRequest->update(['status' => $validatedData['status']]);
        return response()->json(['message' => 'Request updated successfully'], 200);
    }
}
