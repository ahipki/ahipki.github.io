using CreationQuestionnaire.Helpers;
using System.Windows;
using System.Windows.Controls;


namespace CreationQuestionnaire.Views;

/// <summary>
/// Logique d'interaction pour Questions.xaml
/// </summary>
public partial class Questions : Page
{
    public Questions()
    {
        InitializeComponent();
    }
    private void RetourAccueil_Click(object sender, RoutedEventArgs e)
    {
        Helper.NavigateToPage("Views/Accueil.xaml");
    }
}
