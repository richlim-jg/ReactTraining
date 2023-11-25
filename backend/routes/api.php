<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ExpensesController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/user/{id}', [UserController::class, 'show']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'store']);
Route::post('/users/all', [UserController::class, 'index']);
Route::post('/user/{id}', [UserController::class, 'update']);

//expenses routes
Route::post('/expenses/all', [ExpensesController::class, 'index']);
Route::post('/expenses', [ExpensesController::class, 'store']);
// Route::post('/expenses/{id}', [ExpensesController::class, 'show']);
Route::post('/expenses/approve/{id}', [ExpensesController::class, 'approve']);
Route::post('/expenses/{id}', [ExpensesController::class, 'update']);
Route::delete('/expenses/{id}', [ExpensesController::class, 'destroy']);