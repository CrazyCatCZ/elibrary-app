import graphene
from graphene_django import DjangoObjectType

from books.models import Book


class BookType(DjangoObjectType):
    class Meta:
        model = Book


class DeleteBook(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    message = graphene.String()

    def mutate(self, info, id):
        try:
            book = Book.objects.get(id=id)
            book.delete()
            message = 'Success!'
        except: 
            message = 'Book not found!'

        return DeleteBook(message)