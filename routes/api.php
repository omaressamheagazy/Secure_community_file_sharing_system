<?php

use App\Http\Controllers\CommunityController;
use App\Http\Controllers\FileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('files', FileController::class);
    // community routes
    Route::get('communities/{path}/ancestors', [CommunityController::class, 'showAncestors']);
    Route::get('communities/{id}/details', [CommunityController::class, 'showCommunityDetails']);
    Route::get('communities/{community}/keys', [CommunityController::class, 'getCommunityKeys']);
    Route::get('communities/members/{id}', [CommunityController::class, 'showMember']);
    Route::get('communities/public', [CommunityController::class, 'showPublicCommunities']);
    Route::post('/communities/{community}/request', [CommunityController::class, 'sendRequest']);
    Route::get('/communities/{community}/requests', [CommunityController::class, 'showRequests']);
    Route::patch('/communities/{community}/requests/{communityRequest}', [CommunityController::class, 'updateRequest']);
    Route::apiResource('communities', CommunityController::class);
});

/**
 * Route::post('/communities/{community}/request', 'CommunityController@sendRequest')->name('communities.request');
Route::put('/communities/{community}/request/{request}', 'CommunityController@updateRequest')->name('communities.request.update');
Route::get('/communities/{community}/requests', 'CommunityController@getRequests')->name('communities.requests');
 */