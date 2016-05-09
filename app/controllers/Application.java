package controllers;

import play.*;
import play.mvc.*;
import views.html.*;

public class Application extends Controller {
	//renders base page that single page app lives in 
	public static Result base(String path) {
		return ok(base.render());
	}
}
