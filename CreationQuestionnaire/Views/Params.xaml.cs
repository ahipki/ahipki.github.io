using CreationQuestionnaire.Helpers;
using System.Windows;
using System.Windows.Controls;

namespace CreationQuestionnaire.Views; /// <summary>
/// Logique d'interaction pour Params.xaml
/// </summary>
public partial class Params : Page
{
    public Params()
    {
        InitializeComponent();
    }

    private void RetourAccueil_Click(object sender, RoutedEventArgs e)
    {
        Helper.NavigateToPage("Views/Accueil.xaml");
    }
}
