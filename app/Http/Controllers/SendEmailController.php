<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Mail;

use App\Mail\ContactMail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\RateLimiter;

class SendEmailController extends Controller
{
    public function index(Request $request): RedirectResponse
    {
        $name = $request->input('name');
        $email = $request->input('email');
        $message = $request->input('message');

        $executed = RateLimiter::attempt(
            $request->ip(),
            $perTwoMinute = 4,
            function () use ($name, $email, $message) {
                Mail::to(config('app.contact_email'))->send(new ContactMail($name, $email, $message));
            },
            $decayRate = 120,
        );

        if (! $executed) {
            return redirect(route('contact'))->with('error', 'Zu viele gesendete Nachrichten!');
          }


        return redirect(route('contact'))->with('success', 'Nachricht erfolgreich gesendet');
    }
}
