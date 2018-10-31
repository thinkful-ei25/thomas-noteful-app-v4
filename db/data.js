'use strict';

const notes = [
  {
    '_id': '000000000000000000000000',
    'title': '5 life lessons learned from cats',
    'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'folderId': '111111111111111111111100',
    'tags': [],
    'userId': '333333333333333333333300'
  },
  {
    '_id': '000000000000000000000001',
    'title': 'What the government doesn\'t want you to know about cats',
    'content': 'Posuere sollicitudin aliquam ultrices sagittis orci a. Feugiat sed lectus vestibulum mattis ullamcorper velit. Odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Velit egestas dui id ornare arcu odio. Molestie at elementum eu facilisis sed odio morbi. Tempor nec feugiat nisl pretium. At tempor commodo ullamcorper a lacus. Egestas dui id ornare arcu odio. Id cursus metus aliquam eleifend. Vitae sapien pellentesque habitant morbi tristique. Dis parturient montes nascetur ridiculus. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Aliquam faucibus purus in massa tempor nec feugiat nisl.',
    'folderId': '111111111111111111111100',
    'tags': ['222222222222222222222200'],
    'userId': '333333333333333333333300'
  },
  {
    '_id': '000000000000000000000002',
    'title': 'The most boring article about cats you\'ll ever read',
    'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'folderId': '111111111111111111111100',
    'tags': ['222222222222222222222200', '222222222222222222222201'],
    'userId': '333333333333333333333300'
  },
  {
    '_id': '000000000000000000000003',
    'title': '7 things Lady Gaga has in common with cats',
    'content': 'Posuere sollicitudin aliquam ultrices sagittis orci a. Feugiat sed lectus vestibulum mattis ullamcorper velit. Odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Velit egestas dui id ornare arcu odio. Molestie at elementum eu facilisis sed odio morbi. Tempor nec feugiat nisl pretium. At tempor commodo ullamcorper a lacus. Egestas dui id ornare arcu odio. Id cursus metus aliquam eleifend. Vitae sapien pellentesque habitant morbi tristique. Dis parturient montes nascetur ridiculus. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Aliquam faucibus purus in massa tempor nec feugiat nisl.',
    'folderId': '111111111111111111111101',
    'userId': '333333333333333333333300'
  },
  {
    '_id': '000000000000000000000004',
    'title': 'The most incredible article about cats you\'ll ever read',
    'content': 'Lorem ipsum dolor sit amet, boring consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'folderId': '111111111111111111111102',
    'tags': ['222222222222222222222201'],
    'userId': '333333333333333333333300'
  },
  {
    '_id': '000000000000000000000005',
    'title': '10 ways cats can help you live to 100',
    'content': 'Posuere sollicitudin aliquam ultrices sagittis orci a. Feugiat sed lectus vestibulum mattis ullamcorper velit. Odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Velit egestas dui id ornare arcu odio. Molestie at elementum eu facilisis sed odio morbi. Tempor nec feugiat nisl pretium. At tempor commodo ullamcorper a lacus. Egestas dui id ornare arcu odio. Id cursus metus aliquam eleifend. Vitae sapien pellentesque habitant morbi tristique. Dis parturient montes nascetur ridiculus. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Aliquam faucibus purus in massa tempor nec feugiat nisl.',
    'folderId': '111111111111111111111102',
    'tags': ['222222222222222222222201', '222222222222222222222202'],
    'userId': '333333333333333333333301'
  },
  {
    '_id': '000000000000000000000006',
    'title': '9 reasons you can blame the recession on cats',
    'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'folderId': '111111111111111111111102',
    'tags': ['222222222222222222222203'],
    'userId': '333333333333333333333301'
  },
  {
    '_id': '000000000000000000000007',
    'title': '10 ways marketers are making you addicted to cats',
    'content': 'Posuere sollicitudin aliquam ultrices sagittis orci a. Feugiat sed lectus vestibulum mattis ullamcorper velit. Odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Velit egestas dui id ornare arcu odio. Molestie at elementum eu facilisis sed odio morbi. Tempor nec feugiat nisl pretium. At tempor commodo ullamcorper a lacus. Egestas dui id ornare arcu odio. Id cursus metus aliquam eleifend. Vitae sapien pellentesque habitant morbi tristique. Dis parturient montes nascetur ridiculus. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Aliquam faucibus purus in massa tempor nec feugiat nisl.',
    'folderId': '111111111111111111111103',
    'userId': '333333333333333333333301'
  }
];

const folders = [
  {
    '_id': '111111111111111111111100',
    'name': 'Archive 1',
    'userId': '333333333333333333333300'
  },
  {
    '_id': '111111111111111111111101',
    'name': 'Drafts 1',
    'userId': '333333333333333333333300'
  },
  {
    '_id': '111111111111111111111102',
    'name': 'Personal 1',
    'userId': '333333333333333333333300'
  },
  {
    '_id': '111111111111111111111103',
    'name': 'Work 1',
    'userId': '333333333333333333333300'
  },

  {
    '_id': '111111111111111111111104',
    'name': 'Archive 2',
    'userId': '333333333333333333333301'
  },
  {
    '_id': '111111111111111111111105',
    'name': 'Drafts 2',
    'userId': '333333333333333333333301'
  },
  {
    '_id': '111111111111111111111106',
    'name': 'Personal 2',
    'userId': '333333333333333333333301'
  },
  {
    '_id': '111111111111111111111107',
    'name': 'Work 2',
    'userId': '333333333333333333333301'
  }
];

const tags = [
  {
    '_id': '222222222222222222222200',
    'name': 'breed 1',
    'userId': '333333333333333333333300'
  },
  {
    '_id': '222222222222222222222201',
    'name': 'hybrid 1',
    'userId': '333333333333333333333300'
  },
  {
    '_id': '222222222222222222222202',
    'name': 'domestic 1',
    'userId': '333333333333333333333300'
  },
  {
    '_id': '222222222222222222222203',
    'name': 'feral 1',
    'userId': '333333333333333333333300'
  },

  {
    '_id': '222222222222222222222204',
    'name': 'breed 2',
    'userId': '333333333333333333333301'
  },
  {
    '_id': '222222222222222222222205',
    'name': 'hybrid 2',
    'userId': '333333333333333333333301'
  },
  {
    '_id': '222222222222222222222206',
    'name': 'domestic 2',
    'userId': '333333333333333333333301'
  },
  {
    '_id': '222222222222222222222207',
    'name': 'feral 2',
    'userId': '333333333333333333333301'
  }
];

const users = [
  {
    '_id': '333333333333333333333300',
    'fullname': 'Multi User',
    'username': 'multiuser',
    'password': '$2a$10$JLSCUO7F5p4lruyF1WwN6eUG2nmWOVrmj0H2PSWq.9TCkuKMqrUiO'
  },
  {
    '_id': '333333333333333333333301',
    'fullname': 'Tom User',
    'username': 'tomuser',
    'password': '$2a$10$JLSCUO7F5p4lruyF1WwN6eUG2nmWOVrmj0H2PSWq.9TCkuKMqrUiO'
  },
];

module.exports = { folders, notes, tags, users };