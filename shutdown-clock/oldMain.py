import argparse
import time
import os
import pytermgui as ptg


def minutes_to_seconds(time):
    return time*60

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('time', type=int, nargs='?', default=1)
    args=parser.parse_args()

    ptg.Splitter.set_char("separator", " ")
    matrix = ptg.PixelMatrix(6, 8, default="black")
    for y in range(0, matrix.rows):
        for x in range(0, matrix.columns):
            matrix[y, x] = "gray"
    matrix.build()
    
    with ptg.WindowManager() as manager:
        manager.layout.add_slot("body")
        
        window = (
            ptg.Window(
                ptg.Splitter(
                    matrix, matrix, matrix, matrix, matrix, parent_align=1
                )
            ,is_dirty="False", title="dupa"
            )
            .center()
        )
        manager.add(window, assign="body")

    # time_left=minutes_to_seconds(args.time)
    # while time_left > 0:
    #     # print(time_left)
    #     time.sleep(1)
    #     time_left-=1
        switch=True
        color="yellow"
        while True:
            color=="green" if switch else color=="blue"
            for y in range(0, matrix.rows):
                for x in range(0, matrix.columns):
                    matrix[y, x] = color
            time.sleep(1)
            matrix.build()
            switch= not switch
    # os.system("shutdown now")