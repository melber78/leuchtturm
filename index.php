<?php require __DIR__ . "/auth.php"; ?>
<!DOCTYPE html>
<html lang="de">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Leuchtturm</title>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">

<style>

:root{
    --nacht:#16324a;
    --meer:#3d7ea6;
    --gold:#f2a93b;
    --schaum:#f4f6f4;
    --text:#1f2d36;
    --schatten:0 6px 24px rgba(22,50,74,.1);
}

*{ box-sizing:border-box; }

body{
    margin:0; background:var(--schaum); color:var(--text);
    font-family:"Nunito",sans-serif;
}

.portal{ width:min(900px,95%); margin:50px auto; }

.portal-header{ text-align:center; margin-bottom:36px; }
.portal-icon{
    width:70px; height:70px; border-radius:20px;
    background:linear-gradient(135deg, var(--nacht), var(--meer));
    display:flex; align-items:center; justify-content:center;
    color:white; font-size:30px; margin:0 auto 14px;
    box-shadow:var(--schatten);
}
.portal-header h1{ font-size:32px; font-weight:900; margin:0 0 6px; }
.portal-header p{ color:#7c8a85; font-weight:700; margin:0; }

.portal-grid{
    display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-bottom:30px;
}
@media (max-width:650px){ .portal-grid{ grid-template-columns:1fr; } }

.portal-card{
    background:white; border-radius:24px; box-shadow:var(--schatten);
    padding:32px 26px; text-align:center; text-decoration:none; color:var(--text);
    transition:.2s;
}
.portal-card:hover{ transform:translateY(-4px); }
.portal-card i{ font-size:38px; margin-bottom:14px; color:var(--meer); }
.portal-card h2{ font-size:20px; font-weight:900; margin:0 0 6px; }
.portal-card p{ font-size:14px; color:#7c8a85; margin:0; }

.portal-footer{ text-align:center; }
.portal-footer a{
    color:#a0a0a0; font-weight:700; font-size:13px; text-decoration:none;
}

</style>
</head>
<body>

<div class="portal">

<header class="portal-header">
<div class="portal-icon"><i class="fa-solid fa-tower-observation"></i></div>
<h1>Leuchtturm</h1>
<p>Orientierung & Material für LRS-Förderung und Sozialtraining</p>
</header>

<section class="portal-grid">

<a href="lrs.php" class="portal-card">
<i class="fa-solid fa-pen-nib"></i>
<h2>LRS-Förderung</h2>
<p>Arbeitsblatt-Generator nach der AFS-Methode</p>
</a>

<a href="sozialtraining.php" class="portal-card">
<i class="fa-solid fa-people-group"></i>
<h2>Sozialtraining</h2>
<p>Generator, Methodenpool & fertige Vorlagen</p>
</a>

<a href="materialien.php" class="portal-card">
<i class="fa-solid fa-folder-open"></i>
<h2>Materialien</h2>
<p>Eigenes Material hochladen & einordnen</p>
</a>

<a href="trainingshefte.php" class="portal-card">
<i class="fa-solid fa-folder-open"></i>
<h2>Kinder-Akten</h2>
<p>Förderplan, Trainingsheft, Lernbox &amp; Stunden pro Kind (nur Kürzel)</p>
</a>

<a href="foerderkartei.php" class="portal-card">
<i class="fa-solid fa-box-archive"></i>
<h2>Förderkartei</h2>
<p>Fehlerwörter-Lernbox &amp; Lernverlauf pro Kind (nur Kürzel)</p>
</a>

<a href="gutachten.php" class="portal-card">
<i class="fa-solid fa-file-signature"></i>
<h2>Gutachten</h2>
<p>Förderdiagnostik-Gutachten erstellen (lokal, nicht gespeichert)</p>
</a>

</section>

<div class="portal-footer">
<a href="update.php"><i class="fa-solid fa-cloud-arrow-down"></i> Updates</a> &nbsp;·&nbsp; <a href="logout.php"><i class="fa-solid fa-right-from-bracket"></i> Abmelden</a>
</div>

</div>

</body>
</html>
