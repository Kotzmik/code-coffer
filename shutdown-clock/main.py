import argparse
import time
import os
import pytermgui as ptg

def cycle(manager):
    time.sleep(1)
    manager.compositor.stop()

def handle_exit(manager: ptg.WindowManager, window: ptg.Window):
    manager.remove(window)
    # for windows
    if os.name == 'nt':
        os.system('cls')
    # for mac and linux(here, os.name is 'posix')
    else:
        os.system('clear')
    exit()

def convert_seconds_to_time(seconds: int):
    minutes=seconds//60
    seconds_left=seconds%60
    return "{}:{}".format(minutes, seconds_left)

def main(seconds: int):
    #setting up
    ptg.Splitter.set_char("separator", " ")
    matrix_gray = ptg.PixelMatrix(6, 8, default="gray")
    matrix_green = ptg.PixelMatrix(6, 8, default="green")

    with ptg.WindowManager() as manager:
        manager.layout.add_slot("body")
        
        splitter = (
            ptg.Splitter(
                    matrix_gray
                    ,parent_align=1, is_dirty="False", title="Shutdown"
            )
            .center()
        )
        window = ptg.Window(splitter)
        manager.add(window, assign="body")
        manager.compositor.run()

        #start of the program
        cycle(manager)
        splitter += matrix_green
        manager.compositor.run()
        cycle(manager)

        #end of the program
        handle_exit(manager, window)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('minutes', type=int, nargs='?', default=30)
    args=parser.parse_args()

    main(args.minutes*60)
    # print(convert_seconds_to_time(2137))
