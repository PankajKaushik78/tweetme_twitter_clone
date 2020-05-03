import random
from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render

from .models import Tweet


def home_view(request, *args, **kwargs):
    return render(request, "pages/home.html", {})


def tweet_list_view(request, *args, **kwargs):
    """
    REST API VIEW
    So that data can be consumed by Javascript/Java/iOS/Swift/React/...and any other framework
    returns json data
    """
    qs = Tweet.objects.all()
    tweets_list = [{"id": x.id, "content": x.content,
                    "likes": random.randint(1, 100)} for x in qs]
    data = {
        "response": tweets_list,
    }
    return JsonResponse(data)


def tweet_detail_view(request, tweet_id, *args, **kwargs):
    """
    REST API VIEW
    So that data can be consumed by Javascript/Java/iOS/Swift/React/...and any other framework
    returns json data
    """
    data = {
        "id": tweet_id,
    }
    status = 200
    try:
        obj = Tweet.objects.get(id=tweet_id)
        data['content'] = obj.content
    except:
        data['message'] = "Not found"
        status = 404
    return JsonResponse(data, status=status)
