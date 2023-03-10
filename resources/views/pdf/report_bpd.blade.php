<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style>
            * {
                padding: 0px;
                margin: 0px;
            }
            table{
                width: 100%
            }
            table,
            tr,
            td {
                border-collapse: collapse;
                padding: 5px;
                border: 1px solid black;
            }
            .container {
                display: flex;
                margin: 0 auto;
                justify-content: center;
            }
            .header {
                margin: 20px 0;
                text-align: center;
            }

        </style>
    </head>
    <body>
        <div class="container" >
            <div>
                <div class="header">
                    <p>{{$title}}</p>
                    <p>SEKOLAH MENGENGAH KEJURUAN (SMK) TAMTAMA KARANGANYAR</p>
                </div>
                <div class="body">
                    <p>tanggal : {{date('d-m-Y')}}</p>
                    <table>
                        <thead style="text-align: center">
                            <tr>
                                <td rowspan="2">No</td>
                                <td rowspan="2">Nama Alat / Perabot</td>
                                <td rowspan="2">Spesifikasi</td>
                                <td colspan="3">jumlah</td>
                                <td rowspan="2">jumlah</td>
                            </tr>
                            <tr>
                                <td>baik</td>
                                <td>rusak ringan</td>
                                <td>rusak berat</td>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($datas as $d)
                            <tr>
                                <td>{{$loop->iteration}}</td>
                                <td>{{$d->nama}}</td>
                                <td>{{$d->spesifikasi}}</td>
                                <td>{{$d->count_baik}}</td>
                                <td>{{$d->count_rusak_ringan}}</td>
                                <td>{{$d->count_rusak_berat}}</td>
                                <td>{{$d->count_total}}</td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </body>
</html>
