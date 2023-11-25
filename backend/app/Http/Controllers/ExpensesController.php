<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Expense;
use App\Models\User;
use Validator;

class ExpensesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $req)
    {
        $user = User::where('id', $req['user_id'])->first();
        if($user){
            if($user['isAdmin']){
                $results = Expense::orderBy('created_at', 'DESC')->get();
            }
            else{
                $results = Expense::where('user_id', $user['id'])->orderBy('created_at', 'DESC')->get();

                if(!$results){
                    return response('No Expenses Found');
                }
            }
            return response($results);
        }
        //else if user is not admin return results with userid == id
        return response('<h1>Route for Admins only :)</h1>');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = User::where('id', $request['user_id'])->first();
        if($user){
            $validator = Validator::make($request->all(), [
                'title' => 'required',
                'amount' => 'required'
            ]);

            if($validator->fails()){
                $response = [
                    'status' => '0',
                    'error' => $validator->errors(),
                ];
                return response()->json(['errors'=>$response]);
            }

            $expense = Expense::create([
                'title' => $request['title'],
                'amount' => $request['amount'],
                'user_id' => $request['user_id']
            ]);

            if($expense){
                return response(["Message" => "Expense Entry Created"], 200);
            }
            else{
                return response()->json(['errors' => "Error in creating Expense Entry"]);
            }
        }
        return response('<h1>Route for Users only :)</h1>');
        
    }

    /**
     * Display the single specific expense entry.
     */
    public function show(string $id, Request $request)
    {
        $user = User::where('id', $request['user_id'])->first();
        $result = Expense::where('id', $id)->first();
        //only allowed if user is creator OR user is admin
        if($user){
            if($result && ($user['id'] == $result['user_id'] || $user['isAdmin'] == true)){
                return response($result);
            }
            else{
                return response(['errors'=>'Expense Entry Not Found or Can\'t be accessed']);
            }
        }
        return response('<h1>Route for Admins only :)</h1>', 400);
    }

    //approve the expense
    //must be done by an admin
    public function approve($id, Request $request)
    {
        $user = User::where('id', $request['user_id'])->first();
        $result = Expense::where('id', $id)->first();
        //only allowed if user is admin
        if($user && $user['isAdmin']){
            if($result){
                if($result['approved']){
                    $result['approved'] = false;
                    $result['approvedBy'] = null;
                }
                else{
                    $result['approved'] = true;
                    $result['approvedBy'] = $user['id'];
                }
                $result->save();
                return response("Approval Request Completed");
            }
            return response(['errors'=>'Expense Entry Not Found']);
        }
        return response('<h1>Route for Admins only :)</h1>', 400);
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
    public function update(Request $request, string $id)
    {
        $user = User::where('id', $request['user_id'])->first();
        if($user){
            $validator = Validator::make($request->all(), [
                'title' => 'required',
                'amount' => 'required'
            ]);

            if($validator->fails()){
                $response = [
                    'status' => '0',
                    'error' => $validator->errors(),
                ];
                return response()->json(['errors' => $response]);
            }

            $expense = Expense::find($id);
            if($expense){
                $expense->update([
                    'title' => $request['title'],
                    'amount' => $request['amount'],
                ]);
                return response(["Message" => "Expense Entry Updated"], 200);
            }
            else{
                return response()->json(['errors' => "Error in updating Expense Entry"]);
            }
        }
        return response('<h1>Route for Users only :)</h1>');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $expense = Expense::find($id);
        if($expense){
            $expense->delete();
            return response(["Message" => "Expense Entry Deleted"], 200);
        }
        else{
            return response()->json(['errors' => "Error in deleting Expense Entry"]);
        }

    }
}
