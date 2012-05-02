JSONFactory.define('User', {
    'id': 1,
    'name': 'Alice',
    'age': 22,
    'posts': [],
    'comments': []
});

console.log(JSONFactory.build('User'));
console.log(JSONFactory.build('User', {
    'id': 2,
    'name': 'Bob'
}));

// Result
{ id: 1, name: 'Alice', age: 22, posts: [], comments: [] }
{ id: 2, name: 'Bob', age: 22, posts: [], comments: [] }
