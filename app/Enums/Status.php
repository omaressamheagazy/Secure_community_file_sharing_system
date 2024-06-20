<?php
namespace App\Enums;


enum Status: string{
    case PENDING = 'pending';
    case ACCEPT = 'accepted';
    case REJECT = 'rejected';
}