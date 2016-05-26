from random import randrange

def pick_random(name, list):
    chosen = []
    num_picks = randrange(0, len(list))
    for i in range(0, num_picks):
        choice = list[randrange(0, len(list))]

        if choice not in chosen and choice != name:
            chosen.append(choice)
    
    return chosen


def sort_dict(dict, reverse=False):
    return sorted(dict.items(), key = lambda k_v: k_v[1], reverse=reverse)