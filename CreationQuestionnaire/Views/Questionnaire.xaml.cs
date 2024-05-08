using CreationQuestionnaire.Helpers;
using System.Windows;
using System.Windows.Controls;


namespace CreationQuestionnaire.Views;

/// <summary>
/// Logique d'interaction pour Questionnaire.xaml
/// </summary>
public partial class Questionnaire : Page
{
    public Questionnaire()
    {
        InitializeComponent();
    }

    private void RetourAccueil_Click(object sender, RoutedEventArgs e)
    {
        Helper.NavigateToPage("Views/Accueil.xaml");
    }
}
