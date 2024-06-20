<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Community extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'public_key',
        'private_key',
        'parent_id',
        'user_id'
    ];
    public function users(): BelongsToMany {
        return $this->belongsToMany(User::class, 'community_members')->withPivot('membership_key');
    }

    public function owner(): BelongsTo {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function directChilder(): HasMany {    
        return $this->hasMany(CommunityHierarchy::class, 'entity_id')
        ->where('path', '~', '*.10.*{1}');
    }
}
