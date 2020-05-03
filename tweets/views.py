import random
from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect

from .models import Tweet
from .forms import TweetForm


def home_view(request, *args, **kwargs):
    return render(request, "pages/home.html", {})


def tweet_create_view(request, *args, **kwargs):
    """
    Function to handle tweet create form/view
    """
    form = TweetForm(request.POST or None)
    next_url = request.POST.get("next" or None)
    if form.is_valid():
        obj = form.save(commit=False)
        obj.save()
        if next_url != None:
            return redirect(next_url)
        form = TweetForm()
    context = {
        "form": form,
    }
    return render(request, "components/form.html", context)


def tweet_list_view(request, *args, **kwargs):
    """
    Rest Api end point to send json data of all the tweets
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
    Rest Api endpoint to send json data of a particular tweet
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
