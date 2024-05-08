using CreationQuestionnaire.Views;

namespace CreationQuestionnaire.Helpers;

public class Helper
{
    public static void NavigateToPage(string page)
    {
        MainWindow mainWindow = App.GetMainWindowInstance();
        mainWindow.mainFrame.Navigate(new Uri(page, UriKind.Relative));
    }
}
