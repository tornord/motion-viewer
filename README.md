# motion-viewer
Web-based viewer of motion project events

https://motion-project.github.io/index.html 
Används ej!!!!: https://github.com/ccrisan/motioneye/wiki/Install-On-Raspbian 
https://github.com/Motion-Project/motion/releases/download/release-4.4.0/pi_buster_motion_4.4.0-1_armhf.deb

wget https://github.com/Motion-Project/motion/releases/download/release-4.4.0/pi_buster_motion_4.4.0-1_armhf.deb
dpkg -i pi_buster_motion_4.4.0-1_armhf.deb

Inställningar
https://www.ispyconnect.com/camera/d-link

netcam_url http://192.168.1.102/video.cgi
netcam_userpass admin:********

sudo nano /etc/motion/motion.conf
sudo nano /etc/motion/camera1.conf
sudo nano /etc/motion/camera2.conf

## Start/restart service
sudo service motion restart
sudo rm /var/log/motion/motion.log && sudo service motion restart
sudo service motion status
Video files:/var/lib/motion

## Copy files
scp -r pi@192.168.1.84:/var/lib/motion .

scp -r /Users/tor.nordqvist/Projects/Nodejs/test/test200504/src pi@192.168.1.84:/home/pi/test200504
scp /Users/tor.nordqvist/Projects/Nodejs/test/test200504/package.json pi@192.168.1.84:/home/pi/test200504

## Custom config
daemon on
log_file /var/log/motion/motion.log
target_dir /var/lib/motion
framerate 10
minimum_motion_frames 2
post_capture 20
picture_output first
picture_filename %Y-%m-%d_%H-%M-%S_%v_%q
movie_codec mp4
movie_filename %Y-%m-%d_%H-%M-%S_%v
webcontrol_port 8081
webcontrol_localhost off
stream_port 8082
stream_localhost off
camera /etc/motion/camera1.conf
camera /etc/motion/camera2.conf
camera /etc/motion/camera3.conf
