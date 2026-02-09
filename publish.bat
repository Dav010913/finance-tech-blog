@echo off
echo Running Site Update...
git add .
git commit -m "Site Update: %date% %time%"
git push
echo Update Complete.
pause
