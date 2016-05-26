import collections

from helpers import sort_dict, pick_random

class User:

    def __init__(self, name, followers, followees):
        self.name = name
        self.followers = followers
        self.followees = followees
        self.connections = []


    # Output
    def describe(self):
        print('Name: {}'.format(self.name))
        print('Followers: {}'.format(self.followers))
        print('Followees: {}'.format(self.followees))
        print('Follower weight: {}'.format(self.follow_weight))


    # Sets a Counter object of connections
    def count_connections(self):
        self.counts = collections.Counter(self.connections)


    # Score connections based on the follow weight
    def score_connections(self, users):
        counts = self.counts
        self.scores = {}
        for i in counts:

            self.scores[i] = users[i].follow_weight * counts[i]


    # Create a list of followees of followers
    def find_connections(self, users):
        for follower in self.followers:
            for followees in users[follower].followees:
                self.connections.append(followees)
        self.count_connections()


if __name__ == '__main__':

    streamer_list = ['a', 'b', 'c']
    user_list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o']
    
    users = {}

    # Generate streamer followers/followees
    for user in user_list:
        new_user = User(user, pick_random(user, user_list), pick_random(user, user_list))
        users[user] = new_user

    # Determine follower weight
    for user in users:
        users[user].follow_weight = (len(user_list) - len(users[user].followers)) / len(user_list)
        users[user].describe()

    # Calculate connections
    for user in streamer_list:
        users[user].find_connections(users)
        users[user].score_connections(users)

    print('----------------------')
    user = users['b']
    print(user.connections)
    print(user.counts)
    print(sort_dict(user.scores, True))

