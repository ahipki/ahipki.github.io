using CreationQuestionnaire.Helpers;
using CreationQuestionnaire.Models;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
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

    private void dataGrid_CellEditEnding(object sender, DataGridCellEditEndingEventArgs e)
    {
        var quest = (Question)e.Row.Item;
        var column = e.Column as DataGridBoundColumn;
        if (column != null)
        {
            var bindingPath = (column.Binding as Binding)?.Path.Path;
            if (bindingPath != null)
            {
                var textBox = e.EditingElement as System.Windows.Controls.TextBox;
                if (textBox != null)
                {
                    var property = quest.GetType().GetProperty(bindingPath);
                    if (property != null)
                    {
                        property.SetValue(quest, textBox.Text);
                    }
                    if (string.IsNullOrEmpty(textBox.Text))
                    {
                        e.Cancel = true;
                    }
                    if (string.IsNullOrEmpty(quest.QuestionText))
                    {
                        e.Cancel = true;
                        MessageBox.Show("La question est obligatoire");
                    }
                }
            }
        }
    }
}
