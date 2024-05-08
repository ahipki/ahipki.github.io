using CreationQuestionnaire.Helpers;
using System.Windows;
using System.Windows.Controls;

namespace CreationQuestionnaire.Views;

/// <summary>
/// Logique d'interaction pour Accueil.xaml
/// </summary>
public partial class Accueil : Page
{
    public Accueil()
    {
        InitializeComponent();
    }

    private void GererQuestions_Click(object sender, RoutedEventArgs e)
    {
        Helper.NavigateToPage("Views/Questions.xaml");
    }

    private void GererQuestionnaires_Click(object sender, RoutedEventArgs e)
    {
        Helper.NavigateToPage("Views/Questionnaire.xaml");
    }

    private void GererParams_Click(object sender, RoutedEventArgs e)
    {
        Helper.NavigateToPage("Views/Params.xaml");
    }
}
