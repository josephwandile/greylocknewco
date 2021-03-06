# GreylockU Hackfest Project

> Building a stronger professional network

![Cover Photo](art.png)

# Main Features

- Integration with wit.ai plus our own API for scraping news from Google makes it easy to provide actionable insights. News articles that are relevant to a contact's interests, or field; suggestions for meetups based on when your contacts have suggested they'll next be in town, and so on.
- Several layers of internal logic that provide suggestions when you haven't spoken to a contact for a long time, always referencing common interests or relevant talking points based on your past meetings and history together.

# Product Structure

#### The app prompts you to log your meetings, either with existing contacts, or new contacts. The questions are designed to provide strong talking points for future interactions, and are used to make actionable suggestions: all displayed in your feed.

> We've found an article that Joe Blogs might like. Have a read, and consider sending it along to him?

> You haven't spoken to Bob in a while. He's scheduled to be in Boston in a week. Send an email to meet up?

# Running the app

```npm install -g ionic```

In one terminal tab, run
```
gulp
```

Then, in the other, run either of the below:

## normal
```
ionic serve
```
## view on ios and android side by side
```
ionic serve --lab
```

#### Add new dependencies using gulp in the standard way.


# Todos

* Follow [Airbnb style guide](https://github.com/airbnb/javascript)
* Use [gulp jshint](https://www.npmjs.com/package/gulp-jshint) (`gulp-jshint`, `jshint-stylish`)
