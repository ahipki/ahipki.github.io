using CreationQuestionnaire.Views;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;

namespace CreationQuestionnaire.Helpers;

public class Helper
{
    public static void NavigateToPage(string page)
    {
        MainWindow mainWindow = App.GetMainWindowInstance();
        mainWindow.mainFrame.Navigate(new Uri(page, UriKind.Relative));
    }

    public static T FindVisualParent<T>(DependencyObject child) where T : DependencyObject
    {
        while (child != null)
        {
            DependencyObject parentObject = VisualTreeHelper.GetParent(child);
            if (parentObject == null)
                return null;

            T parent = parentObject as T;
            if (parent != null)
                return parent;

            child = parentObject;
        }
        return null;
    }

    public static string GetPreviousText(TextBox textBox)
    {
        // Récupérez le texte précédent à partir des données attachées à la TextBox
        return textBox.Tag as string ?? string.Empty;
    }
}
