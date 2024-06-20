<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommunityHierarchyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'path' => $this->path,
            'is_community' => $this->is_community,
            'entity_id' => $this->entity_id,
            'created_at' => (new \DateTime($this->created_at))->format('M d, Y'),
        ];
    }
}
