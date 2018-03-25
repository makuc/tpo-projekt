(function() {
    /* global angular */
    var data = function($http, authentication, $rootScope) {
        function setTitle(title){
            $rootScope.title = title;
        }
        
        function browse(genres) {
            var query = "";
            if(genres) {
                query = "?";
                for(var i = 0; i < genres.length; i++) {
                    if(i != 0) query += "&";
                    query += "g=" + genres[i];
                }
            }
            return $http.get('/api/v1/novels' + query, {
                headers: {
                    "x-access-token": authentication.getToken()
                }
            });
        }
        function library() {
            return $http.get('/api/v1/library', {
                headers: {
                    "x-access-token": authentication.getToken()
                }
            });
        }
        function mynovels() {
            return $http.get('/api/v1/my', {
                headers: {
                    "x-access-token": authentication.getToken()
                }
            });
        }
        function search(search, genres) {
            var query = "?s=" + search;
            if(genres) {
                for(var i = 0; i < genres.length; i++) {
                    query += "&g=" + genres[i];
                }
            }
            return $http.get('/api/v1/novels' + query, {
                headers: {
                    "x-access-token": authentication.getToken()
                }
            });
        }
        
        
        function novelDetails(novel_id) {
            return $http.get('/api/v1/novels/' + novel_id, {
                headers: {
                    "x-access-token": authentication.getToken()
                }
            });
        }
        function addNovel(novel) {
            return $http.post('/api/v1/novels', {
                title: novel.title,
                description: novel.description,
                tags: novel.stringTags
            }, {
                headers: {
                    "x-access-token": authentication.getToken()
                }
            });
        }
        function updateNovel(novel_id, novel) {
            return $http.put('/api/v1/novels/' + novel_id, {
                title: novel.title,
                description: novel.description,
                tags: novel.stringTags
            }, {
                headers: {
                    "x-access-token": authentication.getToken()
                }
            });
        }
        function deleteNovel(novel_id) {
            return $http.delete('/api/v1/novels/' + novel_id, {
                headers: {
                    "x-access-token": authentication.getToken()
                }
            });
        }
        
        function chapter(novel_id, chapter_id) {
            return $http.get('/api/v1/novels/' + novel_id + '/' + chapter_id, {
                headers: {
                    "x-access-token": authentication.getToken()
                }
            });
        }
        function addChapter(novel_id, chapter) {
            return $http.post('/api/v1/novels/' + novel_id, {
                title: chapter.title,
                chapter: chapter.chapter
            }, {
                headers: {
                    "x-access-token": authentication.getToken()
                }
            });
        }
        function updateChapter(novel_id, chapter_id, chapter) {
            return $http.put('/api/v1/novels/' + novel_id + "/" + chapter_id, {
                title: chapter.title,
                chapter: chapter.chapter
            }, {
                headers: {
                    "x-access-token": authentication.getToken()
                }
            });
        }
        function deleteChapter(novel_id, chapter_id) {
            return $http.delete('/api/v1/novels/' + novel_id + '/' + chapter_id, {
                headers: {
                    "x-access-token": authentication.getToken()
                }
            });
        }
        
        function addToLibrary(novel_id) {
            return $http.post('/api/v1/users/library', {novel_id: novel_id}, {
                headers: {
                    "x-access-token": authentication.getToken()
                }
            });
        }
        function removeFromLibrary(novel_id) {
            return $http.delete('/api/v1/users/library/' + novel_id, {
                headers: {
                    "x-access-token": authentication.getToken()
                }
            });
        }
        
        function addReview(novel_id, review) {
            return $http.post('/api/v1/novels/' + novel_id + '/review', review, {
                headers: {
                    "x-access-token": authentication.getToken()
                }
            });
        }
        
        // Make functions PUBLIC
        return {
            setTitle: setTitle,
            
            browse: browse,
            search: search,
            library: library,
            mynovels: mynovels,
            
            novelDetails: novelDetails,
            addNovel: addNovel,
            updateNovel: updateNovel,
            deleteNovel: deleteNovel,
            
            chapter: chapter,
            addChapter: addChapter,
            updateChapter: updateChapter,
            deleteChapter: deleteChapter,
            
            addToLibrary: addToLibrary,
            removeFromLibrary: removeFromLibrary,
            
            addReview: addReview
        };
    };
    data.$inject = ['$http', 'authentication', '$rootScope'];
    
    angular
        .module('aa-novels')
        .service('aaData', data);
})();