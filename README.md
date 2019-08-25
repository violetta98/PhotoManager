About launch
1. Clone this repository.
2. Intall MongoDb (here is video how to install MongoDB on Windows 10 - https://www.youtube.com/watch?v=FwMwO8pXfq0, 
   if you use other OS - please google how to install mongodb)
3. Tune AuthOptions in appsettings.json:
   1. Issuer - Identifies principal that issued the JWT.
   2. Audience - Identifies the recipients that the JWT is intended for.
   3. Key - Identifies the key of the JWT.
   4. Lifetime (in minutes) - Identifies the expiration time on and after which the JWT must not be accepted for processing.
4. Tune MongoConnection in appsettings.json:
   1. ConnectionString (ConnectionString has the following form:
       mongodb://[username:password@]hostname[:port][/[database][?options]]
       (example: mongodb://user:pass@localhost/db1?authSource=userDb, 
       in this case, the user with "user" login and password "pass" connects to the "db1" database on localhost. 
       In addition, the optional authSource parameter is also set with the value of "userDb".)
       If the port is not specified, the default port is 27017.)
5. Please register here: https://cloudinary.com/ 
6. Tune CloudinaryAccount in appsettings.json:
   1. After registration please go to https://cloudinary.com/console (Dashboard) -> account details section, then set params:
   2. Cloud - Identifies cloud name.
   3. ApiKey - Identifies API Key.
   4. ApiSecret - Identifies API Secret.
7. Tune Serilog in appsettings.json:
   1. MinimumLevel - Identifies minimum level of logging
   2. Write logs to file:
       You can set path of logging files in Serilog -> WriteTo (Name: File) -> Args -> Path (by default it's Logs folder)
       You can also set rollingInterval (by default it's 1 day) and outputTemplate 
      (by default: {Timestamp:dd-MMM-yyyy HH:mm:ss.fff zzz} [{Level:u3}] {Message:lj}{NewLine}{Exception})
   3. Write logs to seq:
       Please install Seq from here: https://docs.datalust.co/docs
       Then you can set serverUrl in Serilog -> WriteTo (Name: Seq) -> Args -> ServerUrl (by default it's http://localhost:5341)
8. Build solution and run. (it's necessary to have Internet)


About site
1. After running site you will get Sign In page where you need to enter your credentials.
2. If you don't have an account - please go to Sign Up page by link "Sign Up" below and register.
   You need to provide valid email and password at least 6 symbols that doesn't contain tags or scripts.
   Password confirmation should be the same as password.
   You can see password after clicking on eye.
   You can submit form if click Continue or if you press enter and one field in form will be focused (only on Sign In and Sign Up pages).
   You are not able to get any other pages while you are not sign in or sign up.
3. After you are authenticated you will get Gallery page. 
   On Gallery Page you are able to:
   1. Add new photos (max 5 at a time):
       After clicking Continue you get Additional Info Page where you can set name (required, no more than 25 symbols, not tags or scripts), description (no more than 500 symbols, not tags or scripts) and add selected photos to existing albums (using tags input)
       After clicking Continue these photos will be added to Gallery and Selected Albums.
   2. Edit photo: 
       You should click on edit picture (pencil) under photo or click on photo image or photo name and then on popup click on the same edit picture.
       After that you can remove existing image and select new.
       After clicking continue you get Additional Info Page where can set name (required, no more than 25 symbols, not tags or scripts), description (no more than 500 symbols, not tags or scripts) and add selected photos to existing albums (using tags input).
   3. Delete photo:
       You should click on trash picture under photo or click on photo image or photo name and then on popup click on the same trash picture.
       After clicking trash picture you need to confirm deleting and photo will be deleted from gallery.
   4. View photo:
       Click on photo (image or name) and popup with photo info will appear. You can see photo description and albums where current photo was added.
       If you click on album - you will get album page.
       Also you can click on forward or back arrows to see next or previous photo in gallery. 
       If you click on forward arrow on last photo in gallery you will see info about first photo in gallery.
       If you click on back arrow on first photo in gallery you will see info about last photo in gallery.
   Also pagination was added to gallery page. Page index is stored on url and you can change this in url or on UI.
4. If you click on header on Albums link you will get albums page.
   On Albums Page you are able to:
   1. Add new album
       After clicking "Add new album" you can set album name (no more than 25 symbols, not tags or scripts) and description (no more than 500 symbols, not tags or scripts). After clicking continue it will be added.
   2. Edit album: 
       You should click on edit picture (pencil) under album. After that in popup you can set name (no more than 25 symbols, not tags or scripts) and description (no more than 500 symbols, not tags or scripts). After clicking continue it will be edited.
   3. Delete album:
       You should click on trash picture under album. After clicking this you need to confirm deleting and album will be deleted.
   4. View album:
       If you click on cover picture or name of album you will get Album Page.
5. On Album Page you are able to do the same things as on Gallery Page. But here are some additional features.
   1. If you click on add new photos, select them then in tags input will be added current album (but you can delete this if you want).
   2. After trying to delete photo you need to choose: from gallery (photo will deleted from gallery and from all albums) or this album (photo will be deleted only from current album). 
   3. You also can edit or delete album in the same way as on Albums Page. After deleting album you will be redirected to Albums Page.

If you have any questions please contact author via skype: live:violettapidvolotska.
All rights reserved.
