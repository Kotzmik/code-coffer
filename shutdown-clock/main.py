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

def main():
    ptg.Splitter.set_char("separator", " ")
    matrix_gray = ptg.PixelMatrix(6, 8, default="gray")
    matrix_green = ptg.PixelMatrix(6, 8, default="green")

    with ptg.WindowManager() as manager:
        manager.layout.add_slot("body")
        
        splitter = (
            ptg.Splitter(
                    matrix_gray
                    ,parent_align=1, is_dirty="False", title="dupa"
            )
            .center()
        )
        window = ptg.Window(splitter)
        manager.add(window, assign="body")
        manager.compositor.run()
        cycle(manager)
        splitter += matrix_green
        manager.compositor.run()
        cycle(manager)

        handle_exit(manager, window)
        # splitter.pop()
        # splitter += matrix_gray
        # i=0
        # switch=True
        # color="yellow"
        # while True:
            # window.pop()
        #     if switch:
        #         color="blue"
        #     else:
        #         color="green"

        #     time.sleep(1)
        #     switch= not switch
        #     i+=1
        #     if i==10: break


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('time_left', type=int, nargs='?', default=30)
    args=parser.parse_args()

    main()
