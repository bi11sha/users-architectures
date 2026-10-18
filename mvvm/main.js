// mvvm/main.js — сборка: Model → ViewModel → View.
import { UserModel } from './model.js';
import { UsersViewModel } from './viewmodel.js';
import { UsersView } from './view.js';
new UsersView(new UsersViewModel(new UserModel()));
