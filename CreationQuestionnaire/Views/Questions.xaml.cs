using CreationQuestionnaire.Helpers;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;


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

    private void TextBlock_PreviewMouseWheel(object sender, MouseWheelEventArgs e)
    {
        // Vérifier si la touche Ctrl est enfoncée
        if (Keyboard.Modifiers == ModifierKeys.Control)
        {
            // Récupérer le TextBlock
            TextBlock textBlock = sender as TextBlock;

            // Définir les bornes de la taille de police
            double minFontSize = 10;
            double maxFontSize = 50;

            // Ajuster la taille de police en fonction de la direction de la molette
            if (e.Delta > 0 && textBlock.FontSize < maxFontSize)
            {
                // Augmenter la taille de police
                textBlock.FontSize += 2;
            }
            else if (e.Delta < 0 && textBlock.FontSize > minFontSize)
            {
                // Diminuer la taille de police
                textBlock.FontSize -= 2;
            }

            // Indiquer que l'événement a été manipulé pour éviter que la ScrollViewer ne soit également déclenchée
            e.Handled = true;
        }
    }
}
