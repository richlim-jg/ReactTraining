<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Expense;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => 'test',
            'isAdmin' => true,
            'password' => Hash::make('test')
        ]);

        Expense::insert([
            [
                'title' => 'Lunch with client',
                'approved' => true,
                'user_id' => 1,
                'approvedBy' => 1,
                'amount' => 50.00
            ],
            [
                'title' => 'Water Bill',
                'approved' => false,
                'user_id' => 1,
                'approvedBy' => null,
                'amount' => 15.00
            ],
            [
                'title' => 'Utilities',
                'approved' => false,
                'user_id' => 1,
                'approvedBy' => null,
                'amount' => 23.75
            ],
            [
                'title' => 'Electricity',
                'approved' => true,
                'user_id' => 1,
                'approvedBy' => null,
                'amount' => 3500
            ],
            [
                'title' => 'Building Fees',
                'approved' => false,
                'user_id' => 1,
                'approvedBy' => null,
                'amount' => 1250
            ]
        ]);
    }
}
