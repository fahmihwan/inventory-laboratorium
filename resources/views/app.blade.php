<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <link href="{{ asset('css/sb-admin-2.min.css') }}" rel="stylesheet" />
    <link href="{{ asset('vendor/fontawesome-free/css/all.min.css') }}" rel="stylesheet" type="text/css" />
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    @inertiaHead
  </head>
  <body id="page-top">
    @inertia('app')
       <!-- Bootstrap core JavaScript-->
       <script src="{{ asset('vendor/jquery/jquery.min.js') }} "></script>
       <script src="{{ asset('vendor/bootstrap/js/bootstrap.bundle.min.js') }} "></script>

       <!-- Core plugin JavaScript-->
       <script src="{{ asset('vendor/jquery-easing/jquery.easing.min.js') }} "></script>

       <!-- Custom scripts for all pages-->
       <script src="{{ asset('js/sb-admin-2.min.js') }} "></script>


  </body>
</html>