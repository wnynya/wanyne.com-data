session=ga-wanyne-com
tmux has-session -t $session || tmux new-session -d -s $session
tmux set-option -t $session -p remain-on-exit
tmux send-keys -t $session C-c
tmux send-keys -t $session "bash" C-m
tmux send-keys -t $session "cd /home/wnynya/github-actions-runners/wanyne.com/_work/wanyne.com/wanyne.com" C-m
tmux send-keys -t $session "npm run start" C-m