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

    /// <summary>
    /// Charge en format JSON la configuration d'un questionnaire
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    private void ChargerConfigurationQuestionnaire_Click(object sender, RoutedEventArgs e)
    {
        // Choisir le fichier à charger, par défaut : "configurations" de l'application

        // Transformation du JSON en données à afficher

    }

    /// <summary>
    /// Sauvegarde en format JSON la configuration d'un questionnaire déposé dans le dossier de son choix avec le nom de son choix
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    private void SauvegarderConfigurationQuestionnaire_Click(object sender, RoutedEventArgs e)
    {
        // Choisir le dossier où sauvegarder la configuration, par défaut : "configurations" de l'application

        // Transformation en JSON du contenu 

        // Sauvegarde
    }

    /// <summary>
    /// Genere x questionnaires selon les parametres chargés en format PDF qui sont déposés dans le dossier de son choix
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    private void GenererQuestionnaire_Click(object sender, RoutedEventArgs e)
    {
        // Choisir le dossier où générer les questionnaires pdf, par défaut "questionnaires/nomChoisi" de l'application

        // Lire les parametres et faire tous les calculs (appel à un service)

        // Indiquer que tout est terminé et montrer le dossier contenant les fichiers générés

    }
}
