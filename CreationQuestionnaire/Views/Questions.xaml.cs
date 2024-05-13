using CreationQuestionnaire.Helpers;
using CreationQuestionnaire.Models;
using CreationQuestionnaire.Services;
using CreationQuestionnaire.ViewModels;
using Microsoft.Win32;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.IO;
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
    private QuestionListViewModel viewModel;

    public Questions()
    {
        InitializeComponent();
        viewModel = new QuestionListViewModel();
        viewModel.LoadQuestionsFromRecentCsv();
        DataContext = viewModel;
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

    /// <summary>
    /// Evenement pour afficher le DisplayName du champ
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    private void OnAutoGeneratingColumn(object sender, DataGridAutoGeneratingColumnEventArgs e)
    {
        e.Column.Header = ((PropertyDescriptor)e.PropertyDescriptor).DisplayName;
    }

    /// <summary>
    /// Evenement pour vérifier les saisies des colonnes
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    private void DataGrid_PreviewTextInput(object sender, TextCompositionEventArgs e)
    {
        DataGridCell cell = sender as DataGridCell;
        if (cell == null || cell.IsEditing == false)
            return;

        DataGridColumn column = cell.Column;
        if (column == null)
            return;

        string columnName = column.Header.ToString();

        switch (columnName)
        {
            case "Ap":
            case "Bp":
            case "Cp":
            case "Dp":
            case "Ep":
            case "Fp":
                // Int ou double négatif ou postiif
                break;
            case "BonneReponse":
                // A B C D E F + /
                break;
            case "Points":
                // Int ou double négatif ou positif
                break;
            case "Multi":
            case "Melange":
                // O N ou vide
                break;
            case "Libre":
                // vide 0 nombre ou max
                break;
            case "Chance":
                // vide ou int de 0 à 100
                break;
            default:
                break;
        }
    }

    /// <summary>
    /// dossier par défaut
    /// </summary>
    /// <returns></returns>
    private string DossierParDefaut()
    {
        string dossierParDefaut = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "questions");

        if (!Directory.Exists(dossierParDefaut))
        {
            Directory.CreateDirectory(dossierParDefaut);
        }

        return dossierParDefaut;
    }

    /// <summary>
    /// Sauvegarde de la liste des questions affichée au clic sur Sauvegarder une liste de questions
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    private void SauvegarderQuestions_Click(object sender, RoutedEventArgs e)
    {
        // Choisir le répertoire de sauvegarde
        SaveFileDialog saveFileDialog = new SaveFileDialog();

        saveFileDialog.InitialDirectory = DossierParDefaut(); // Dossier par défaut

        saveFileDialog.Filter = "Fichiers CSV (*.csv)|*.csv";
        saveFileDialog.FileName = Path.GetFileName(viewModel.LoadedFileName);

        // Affichez le dialogue et attendez la réponse de l'utilisateur
        bool? result = saveFileDialog.ShowDialog();
        // Vérifiez si l'utilisateur a cliqué sur le bouton "Enregistrer"
        if (result == true)
        {
            QuestionListViewModel viewModel = DataContext as QuestionListViewModel;
            if (viewModel != null)
            {
                var questionList = viewModel.QuestionList;

                // Obtenez le chemin du fichier sélectionné par l'utilisateur
                string filePath = saveFileDialog.FileName;

                // Appelez votre méthode ExportToCsv avec le chemin du fichier
                CsvService.ExportToCsv(questionList.ToList(), filePath);
                viewModel.LoadedFileName = filePath;

                MessageBox.Show("Les questions ont été enregistrées avec succès.", "Enregistrement réussi", MessageBoxButton.OK, MessageBoxImage.Information);
            }
        }
    }

    /// <summary>
    /// Charge un fichier CSV au clic sur le bouton "Charger une liste de questions"
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    private void ChargerQuestions_Click(object sender, RoutedEventArgs e)
    {
        QuestionListViewModel viewModel = DataContext as QuestionListViewModel;

        // Ouvrir une boîte de dialogue pour sélectionner le fichier CSV
        OpenFileDialog openFileDialog = new OpenFileDialog();
        openFileDialog.Filter = "Fichiers CSV (*.csv)|*.csv";
        openFileDialog.InitialDirectory = DossierParDefaut(); // Dossier par défaut

        if (openFileDialog.ShowDialog() == true)
        {
            viewModel.LoadedFileName = openFileDialog.FileName;

            // Une fois que vous avez trouvé le chemin du fichier CSV le plus récent, chargez les données
            ObservableCollection<Question> loadedQuestions = CsvService.LoadQuestionsFromCsv(openFileDialog.FileName);

            // Mettez à jour la propriété QuestionList avec les données chargées
            viewModel.QuestionList = loadedQuestions;
        }
    }
}
