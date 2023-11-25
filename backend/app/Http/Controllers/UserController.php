<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\User;
use Validator;

class UserController extends Controller
{

    public function login(Request $req){
        $user = User::where('name', $req['name'])->first();
        $pass = Hash::make($req['password']);
        if($user){
            if(Hash::check($req['password'], $user['password'])){
                return response(['user' => ['id'=> $user['id'], 'name'=> $user['name'], 'isAdmin' => $user['isAdmin']]]);
                // return response($user);
            }else if($pass != $user['password']) {
                return response()->json(['errors' => 'Incorrect Password']);
            }
        }
        return response(['errors'=>'User Not Found']);
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $req)
    {
        $user = User::where('id', $req['user_id'])->first();
        if($user && $user['isAdmin'] == true){
            $users = User::all();

            return response($users);
        }
        return response('<h1>Route for Admins only :)</h1>', 400);
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:users',  
            'password' => 'required|confirmed',
        ]); 

        if($validator->fails()){
            $response = [
                'status' => '0',
                'error' => $validator->errors(),
            ];

            return response()->json(['errors' => $response]);
        }

        $user = User::create([
            'name' => $request['name'],
            'password' => $request['password']
        ]);
        return response(['user' => $user]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::find($id)->first();
        if($user){
            return response(['user' => $user]);
        }

        return response(['errors'=>'User Not Found']);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $user = User::where('id', $request['user_id'])->first();
        $result = User::where('id', $id)->first();
        //only allowed if user is admin
        if($user && $user['isAdmin']){
            if($result && $result['id'] != $user['id']){
                if($result['isAdmin']){
                    $result['isAdmin'] = false;
                }
                else{
                    $result['isAdmin'] = true;
                }
                $result->save();
                return response("Request Completed");
            }
            return response(['errors'=>'User Not Found or You may not remove yourself as admin']);
        }
        return response('<h1>Route for Admins only :)</h1>', 400);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
