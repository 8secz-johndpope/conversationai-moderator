/*
Copyright 2017 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import {
  CommentFlag,
  CommentRecommendation,
  ICommentInstance,
} from '../../models';

export async function denormalizeFlaggedAndRecommendedCountsForComment(comment: ICommentInstance) {
  const [
    flaggedCount,
    recommendedCount,
  ] = await Promise.all([
    CommentFlag.count({ where: { commentId: comment.id } }),
    CommentRecommendation.count({ where: { commentId: comment.id } }),
  ]);

  const updatedComment = await comment.update({
    flaggedCount,
    recommendedCount,
  });

  return Promise.resolve(updatedComment);
}
