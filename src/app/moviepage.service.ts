import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UrlService } from './url.service';
import { Observable } from 'rxjs';
import { Movie, PostReview } from './models'
import { Review } from './models'
import { PostDiscussion } from './models';

@Injectable({
  providedIn: 'root'
})
export class MoviepageService {
  movieBaseURL: string = "";
  reviewBaseURL: string = "";
  forumBaseURL: string = "";

  constructor(private http: HttpClient, private urlService: UrlService) { 
    this.movieBaseURL = urlService.MovieAPIUrl + "movie/";
    this.reviewBaseURL = urlService.ReviewsAPIUrl + "review/";
    this.forumBaseURL = urlService.ForumAPIUrl + "forum/";
  }

  //Function that will call the Movie Microservice API movie/movieid end point
  //to return a movie's details
  getMovieDetails(movieid: string): Observable<Movie>
  {
    return this.http.get<Movie>( this.movieBaseURL + "/" + movieid);
  }

  //Function that will call the Movie Microservice API follow endpoint
  //that will get movies user is following
  getUserFollowingMovies(userid: string)
  {
    return this.http.get( this.movieBaseURL + "follow/" + userid);
  }

  //Function that will call the Movie Microservice API follow/movieid/userid endpoint
  //to add the movie to the user's movie following list
  addMovieToFollowing(movieid: string, userid: string)
  {
    return this.http.put( this.movieBaseURL + movieid + "/" + userid, null);
  }

  //Function that will call the movie MSA 
  // to post movie
  postMovieId(movieID: string) {
    return this.http.post(this.movieBaseURL + "movie/" + movieID, null);
  }

  //Function will call the Forum Microservice API discussion/movieid endpoint
  //to return movie discussions
  getMovieDiscussion(moveid: string)
  {
    return this.http.get( this.forumBaseURL + "discussions/"+ moveid);
  }

  //Function will call the Forum Microservice to post a discussion to a 
  //given movie
  postDiscussion(discussion: PostDiscussion)
  {
    return this.http.post( this.forumBaseURL + "discussion", discussion);
  }

  //Function will call Forum Microservice topic endpoint to get a list of topics
  getTopics()
  {
    return this.http.get( this.forumBaseURL + "topics");
  }

  followMovie(){
    return this.http.put( this.movieBaseURL + "/" +  movieid + "/" + userid, null);
  }

  //Removes a movie from a following
  removeMovieFromFollowing(movieid: string, userid: string)
  {
    return this.http.delete (this.movieBaseURL + "/" +  movieid + "/" + userid );
  }

  //Function to update a given movie
  updateMovie(movieid: string, movie: Movie)
  {
    return this.http.put( this.movieBaseURL + "/" + movieid, movie);
  }

  //Append a given movie
  appendMovie(movieid: string, movie: Movie)
  {
    return this.http.patch( this.movieBaseURL + "/" + movieid, movie);
  }

  //Delete a movie
  deleteMovie(movieid: string)
  {
    return this.http.delete( this.movieBaseURL + "/" +  movieid);
  }

  //Search for a list of movies from given filter (create filter)
  searchMovies(filter: any)
  {
    return this.http.post( this.movieBaseURL + "/search", filter);
  }

  //create a movie
  createMovie(movie: Movie)
  {
    return this.http.post ( this.movieBaseURL, movie);
  }

  //add a vote for a movie tag (create tagging model)
  voteForTag(taggingDTO : any)
  {
    return this.http.post ( this.movieBaseURL + "/tags", taggingDTO);
  }

  //Get all movie tags
  getMovieTags()
  {
    return this.http.get( this.movieBaseURL + "/tags");
  }

  //Bans a specified tag
  banMovieTag(tagname: string)
  {
    return this.http.put( this.movieBaseURL + "/tag/ban/" + tagname, null);
  }

  //Unbans a tag
  unbanMovieTage(tagname: string)
  {
    return this.http.delete ( this.movieBaseURL + "/tag/ban/" + tagname);
  } 

}
