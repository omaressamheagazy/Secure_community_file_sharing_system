<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class CommunityHierarchy extends Model
{
    use HasFactory;
    static public function getDirectChildern($id) {
        $idPattern = "*." . (string)$id . ".*{1}";
        return DB::table('community_hierarchies')
        ->where('path', '~', $idPattern)
        ->select('*')
        ->get();
    } 
    static public function getAncestors($nodePath) {
        return DB::table('community_hierarchies')
        ->where('path', '@>', $nodePath)
        ->select('*')
        ->get();
    }
    static function getCommunity($communityId) {
        return DB::table('community_hierarchies')
        ->where('entity_id', $communityId)
        ->where('is_community', true)
        ->select('*')
        ->first();
    }

    static function getCommunityDetails($communityId) {
        $community = Self::getCommunity($communityId);
        if (!$community) return null;
        $communityEntites= Self::getDirectChildern($communityId);
        $communityAncestors = Self::getAncestors($community->path);
        $totalFiles = $communityEntites->where('is_community', false)->count();
        $totalCommunities = $communityEntites->count() - $totalFiles;
        return [
            'parent' => $community,
            'entites' => $communityEntites,
            'ancestors' => $communityAncestors,
            'total_communities' => $totalCommunities,
            'total_files' => $totalFiles
        ];
    }
}
