import argparse
import time
import os

def minutes_to_seconds(time):
    return time*60


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('time', type=int)

    args=parser.parse_args()

    time_left=minutes_to_seconds(args.time)
    while time_left > 0:
        print(time_left)
        time.sleep(1)
        time_left-=1

    # os.system("shutdown now")