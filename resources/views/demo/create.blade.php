<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .form-control{
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div>
        <form action="/demo/store" method="POST">
            @csrf
            <div class="form-control">
                <input type="text" placeholder="nama" name="nama"> <br>
            </div>
            <div class="form-control">
                <input type="text" placeholder="username" name="username"> <br>
            </div>
            <div class="form-control">
                <select name="hak_akses" id=""> 
                    <option value="sarpras">sarpras</option> 
                    {{-- <option value="admin_akl">admin akl</option>
                    <option value="admin_bpd">admin bpd</option>
                    <option value="admin_ap">admin ap</option>
                    <option value="admin_tkj">admin tkj</option> --}}
                </select> <br>
            </div>
            <div class="form-control">
             <input type="text" name="password" placeholder="password"><br>
            </div>
            <button>Submit</button>
        </form>
    </div>

</body>
</html>