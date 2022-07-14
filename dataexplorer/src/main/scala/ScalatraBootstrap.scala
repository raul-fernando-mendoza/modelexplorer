import com.dataexplorer.app._
import org.scalatra._
import javax.servlet.ServletContext


class ScalatraBootstrap extends LifeCycle {

  override def init(context: ServletContext) {
    context.mount(new JsonServlet, "/jsonServlet")
    context.mount(new DataExplorerServlet, "/home")
    context.mount(new SnowParkServlet, "/snowpark")
    context.mount(new JsonReceiveServlet, "/api")
  }
}
