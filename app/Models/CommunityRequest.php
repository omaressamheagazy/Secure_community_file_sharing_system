<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class CommunityRequest extends Model
{
    use HasFactory;
    protected $table = 'communities_requests';
    protected $fillable = ['user_id', 'community_id', 'status'];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }   

    public static function isReuqestExists($communityId, $userId): bool
    {
        $request = Self::where('community_id', $communityId)
        ->where('user_id', $userId)
        ->whereNot('status', 'rejected')
        ->first();
        return $request ? true : false;
    }
}
