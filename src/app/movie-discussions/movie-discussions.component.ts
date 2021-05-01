import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscussionService } from '../discussion.service';
import { LoggerService } from '../logger.service';
import { Discussion } from '../models/models';

@Component({
  selector: 'app-movie-discussions',
  templateUrl: './movie-discussions.component.html',
  styleUrls: ['./movie-discussions.component.scss']
})
export class MovieDiscussionsComponent implements OnInit {
  discussions: Discussion[];

  constructor(
    private discussionService: DiscussionService,
    private logger: LoggerService,
    private router: ActivatedRoute) { }

  ngOnInit(): void {
    let movieId = this.router.snapshot.params.id;
    this.logger.log("movieId", movieId);
    this.discussionService.getMovieDiscussions(movieId).then(reply => {
      if (reply == null || reply == undefined) {
        return;
      }
      this.logger.log("movie page discussions", reply);
      this.discussions = reply.slice(0, 5);
      this.logger.log("discussions", this.discussions);
    }).catch(err => {
      // todo: remove test discussions
      this.testGenerateDiscussions();
    });
  }

  testGenerateDiscussions() {
    this.discussions = [
      this.testGetDiscussion("some discussion"),
      this.testGetDiscussion("a discussion with a pretty long subject"),
      this.testGetDiscussion("short subject"),
      this.testGetDiscussion("a random subject"),
      this.testGetDiscussion("a discussion with a very very very long subject"),
    ];
  }

  testGetDiscussion(subject: string): Discussion {
    let d = new Discussion();
    d.subject = subject;
    return d;
  }

}
