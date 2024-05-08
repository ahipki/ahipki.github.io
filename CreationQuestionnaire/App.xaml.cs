using CreationQuestionnaire.Helpers;
using CreationQuestionnaire.Views;
using System.Windows;

namespace CreationQuestionnaire;

/// <summary>
/// Interaction logic for App.xaml
/// </summary>
public partial class App : Application
{
    private static MainWindow mainWindowInstance;

    protected override void OnStartup(StartupEventArgs e)
    {
        base.OnStartup(e);

        // Créer une seule instance de la fenêtre principale
        mainWindowInstance = new MainWindow();
        Helper.NavigateToPage("Views/Accueil.xaml");
        mainWindowInstance.Show();
    }

    public static MainWindow GetMainWindowInstance()
    {
        return mainWindowInstance;
    }
}
