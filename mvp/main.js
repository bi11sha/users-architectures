// mvp/main.js — точка сборки MVP: создаём Model и View, отдаём их Presenter'у.
import { UserModel } from './model.js';
import { UsersView } from './view.js';
import { UsersPresenter } from './presenter.js';
new UsersPresenter(new UserModel(), new UsersView());
