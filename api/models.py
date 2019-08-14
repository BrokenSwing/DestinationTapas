from django.db import models
from django.contrib.auth.models import User


class UserMisc(models.Model):
    """
    Used to serve misc information about users
    """

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    @property
    def friends(self):
        result = FriendRequest.objects.filter(models.Q(from_user=self.user) | models.Q(to_user=self.user))\
            .filter(status="ACCEPTED").all()
        friends = []
        for request in result:
            friends.append((request.from_user if request.to_user == self.user else request.to_user).id)
        return friends

    @property
    def received_requests(self):
        return [request.from_user.id for request in FriendRequest.objects.filter(to_user=self.user).filter(
            status="PENDING").all()]

    @property
    def sent_requests(self):
        return [request.to_user.id for request in FriendRequest.objects.filter(from_user=self.user).filter(
            status="PENDING").all()]

    @property
    def total_spent(self):
        return CommandContribution.objects.filter(user=self.user).aggregate(models.Sum('part'))['part__sum']


class FriendRequest(models.Model):
    """
    Represents a friend request made by an user to an other user.
    """

    STATUS = (
        ('PENDING', 'PENDING'),
        ('ACCEPTED', 'ACCEPTED'),
        ('REJECTED', 'REJECTED'),
        ('DELETED', 'DELETED'),
        ('CANCELED', 'CANCELED'),
    )

    from_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='request_from', default=-1)
    to_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='request_to', default=-1)
    request_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=8, choices=STATUS)

    def __str__(self):
        return "Request from {} to {} with state {}".format(self.from_user.username, self.to_user.username, self.status)


class Ingredient(models.Model):
    """
    Represents an ingredient which composes zero or more products (can be food, alcohol, etc ...).
    """
    name = models.CharField(max_length=35)

    def __str__(self):
        return self.name


class Product(models.Model):
    """
    Represents a product that can be ordered to waiter.
    Ex: shot tray, food trail, single shot
    """

    TYPES = (
        ("FOOD", "FOOD"),
        ("COCKTAIL", "COCKTAIL"),
        ("SHOT", "SHOT"),
        ("OTHER", "OTHER")
    )

    name = models.CharField(max_length=30)
    price = models.FloatField()
    ingredients = models.ManyToManyField(Ingredient)
    old = models.BooleanField(default=False)
    product_type = models.CharField(max_length=10, choices=TYPES)

    def __str__(self):
        return "{} : {}€ {}".format(self.name, self.price, "(old)" if self.old else "")


class Shot(Product):
    pass


class Command(models.Model):
    """
    Represents a command, a command is just one product ordered, at a specified time by a party.
    """

    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="command_author")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    contributions = models.ManyToManyField(User, through='CommandContribution')
    date = models.DateTimeField(auto_now_add=True)

    @property
    def total_price(self):
        """Return the total price for the command"""
        return CommandContribution.objects.filter(command=self).aggregate(models.Sum('part'))['part__sum']

    def __str__(self):
        return "Command n°{} from {} ({} contributions)".format(self.id, self.author.username,
                                                                self.contributions.count())


class ShotTrayCommand(Command):
    """
    Represents a shot tray that is composed with 14 shooters
    """
    shots = models.ManyToManyField(Product)


class CommandContribution(models.Model):
    command = models.ForeignKey(Command, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    part = models.FloatField()
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return "Contribution from {} to command n°{} with {}€".format(self.user.username, self.command.id, self.part)


class Party(models.Model):
    """
    Represents a party, at least one user must participate to a party
    """

    STATUS = (
        ('IN PROGRESS', 'IN PROGRESS'),
        ('FINISHED', 'FINISHED'),
    )

    leader = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_leader")
    status = models.CharField(max_length=11, choices=STATUS)
    members = models.ManyToManyField(User, related_name="user_members")
    date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField(null=True, blank=True)
    commands = models.ManyToManyField(Command, blank=True)

    def __str__(self):
        return "Party n°{} of {} with {} members, state : {}".format(self.id, self.date.strftime("%a %d %b %Y at %X"),
                                                                     self.members.count(), self.status)

    @property
    def total_price(self):
        """Return the total price for the party"""
        result = CommandContribution.objects.filter(command__party=self).aggregate(models.Sum('part'))['part__sum']
        return result if result is not None else 0

    @property
    def price_per_user(self):
        """Returns the price each user needs to pay"""
        return CommandContribution.objects.filter(command__party=self).values('user') \
            .annotate(total=models.Sum('part')).order_by('user__username')
