<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFileRequest;
use App\Http\Requests\UpdateFileRequest;
use App\Http\Resources\FileResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Str;
use App\Models\File;



class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $files = File::all()->where('owner_id', Auth::id())->where('parent_id', null);
        return FileResource::collection($files);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFileRequest $request)
    {
        $data = $request->validated();
        $data['owner_id'] = $request->user()->id;
        $fileContent = $data['file'];
        lad($request->input('iv'));
        $extension = 'bin'; // Use a generic extension for encrypted files
        $filename = 'hi' . Str::uuid()->toString() . '.' . $extension;
        if (!Storage::disk('files')->put($filename , file_get_contents($fileContent))) {
            throw new \Exception("Unable to save file ");
        }
        $data['path'] = $filename;
        $file = File::create($data);
        return new FileResource($file);
    }

    /**
     * Display the specified resource.
     */
    public function show(File $file)
    {
        $fullFilePath = 'uploads/files/' . $file->path;
        // Check if the file exists
        if (Storage::exists($fullFilePath)) {

            // Prepare the response with additional headers
            $response = Storage::download($fullFilePath, $file->name, [
                'Access-Control-Expose-Headers' => 'x-iv,x-secret_key,x-name',
                'Content-Type' => 'application/octet-stream'
            ]);
            $response->headers->set('x-secret_key', $file->secret_key);
            $response->headers->set('x-iv', $file->iv);
            $response->headers->set('x-name', $file->name);
            
            return $response;
        } 
        return response()->json(200);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFileRequest $request, File $file)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(File $file)
    {
        //
    }
}
