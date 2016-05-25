from random import randrange
import collections

class User:

    def __init__(self, name, followers, followees):
        self.name = name
        self.followers = followers
        self.followees = followees
        self.connections = []
        self.describe()


    # Output
    def describe(self):
        print('Name: {}'.format(self.name))
        print('Followers: {}'.format(self.followers))
        print('Followees: {}'.format(self.followees))


    # Returns a Counter object of connections
    def rank_connections(self):
        return collections.Counter(self.connections)


    # Create a list of followees of followers
    def find_connections(self, users):
        for follower in self.followers:
            for followees in users[follower].followees:
                self.connections.append(followees)


def pick_random(name, list):
    chosen = []
    for i in range(0, len(list)/2):
        choice = list[randrange(0, len(list))]

        if choice not in chosen and choice != name:
            chosen.append(choice)
    
    return chosen



if __name__ == '__main__':

    user_list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l']
    
    users = {}

    # Generate user followers/followees
    for user in user_list:
        new_user = User(user, pick_random(user, user_list), pick_random(user, user_list))
        users[user] = new_user

    # Calculate connections
    for user in users:
        users[user].find_connections(users)

    print('----------------------')
    print(users['b'].connections)
    print(users['b'].rank_connections())

