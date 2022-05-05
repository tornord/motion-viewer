ssh pi@192.168.1.242
scp -r pi@192.168.1.242:/var/lib/motion c:/temp

scp -r pi@192.168.1.242:/etc/motion/motion.conf c:/temp

# Motion

# Service
sudo nano /etc/motion/motion.conf
sudo rm /var/log/motion/motion.log && sudo service motion restart
sudo service motion status
cat /var/log/motion/motion.log

ps -A | grep motion

# List and remove files
ls -l /var/lib/motion
sudo rm -f /var/lib/motion/*

# Install motion
sudo apt-get install ffmpeg libmariadb3 libpq5 libmicrohttpd12
wget https://github.com/Motion-Project/motion/releases/download/release-4.4.0/pi_buster_motion_4.4.0-1_armhf.deb
sudo dpkg -i pi_buster_motion_4.4.0-1_armhf.deb
sudo apt-get install python-pip python-dev libssl-dev libcurl4-openssl-dev libjpeg-dev libz-dev

# Make owner
#sudo usermod -a -G pi motion
sudo chown -R motion:motion /var/lib/motion
sudo chown motion:motion /var/lib/motion/*
sudo chmod -R u=rwx,g=rwx,o=r /var/lib/motion
sudo chmod u=rwx,g=rwx,o=r /var/lib/motion/*

# Change default read/write for newly added files
sudo apt-get install acl
sudo setfacl -dm u::rwx,g::rwx,o::r /var/lib/motion